package vn.tuan_dao.springrestwithai.feature.email;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import vn.tuan_dao.springrestwithai.exception.InvalidRequestException;
import vn.tuan_dao.springrestwithai.feature.email.dto.EmailResponse;
import vn.tuan_dao.springrestwithai.feature.email.dto.SendEmailRequest;
import vn.tuan_dao.springrestwithai.feature.user.User;
import vn.tuan_dao.springrestwithai.feature.user.UserRepository;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Service
public class EmailServiceImpl implements EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailServiceImpl.class);

    private final JavaMailSender mailSender;
    private final UserRepository userRepository;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public EmailServiceImpl(JavaMailSender mailSender, UserRepository userRepository) {
        this.mailSender = mailSender;
        this.userRepository = userRepository;
    }

    @Override
    public EmailResponse sendEmail(SendEmailRequest request) {
        boolean noIds = request.recipientIds() == null || request.recipientIds().isEmpty();
        boolean noEmails = request.recipientEmails() == null || request.recipientEmails().isEmpty();

        if (noIds && noEmails) {
            throw new InvalidRequestException(
                    "Phải cung cấp ít nhất một recipientIds hoặc recipientEmails");
        }

        Set<String> recipients = collectRecipients(request);

        List<String> failedEmails = new ArrayList<>();
        int successCount = 0;

        for (String email : recipients) {
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom(fromEmail);
                message.setTo(email);
                message.setSubject(request.subject());
                message.setText(request.body());
                mailSender.send(message);
                successCount++;
            } catch (MailException ex) {
                log.warn("Gửi email thất bại tới {}: {}", email, ex.getMessage());
                failedEmails.add(email);
            }
        }

        return new EmailResponse(recipients.size(), successCount, failedEmails);
    }

    private Set<String> collectRecipients(SendEmailRequest request) {
        Set<String> emails = new LinkedHashSet<>();

        if (request.recipientIds() != null && !request.recipientIds().isEmpty()) {
            List<User> users = userRepository.findAllById(request.recipientIds());
            users.forEach(user -> emails.add(user.getEmail()));
        }

        if (request.recipientEmails() != null) {
            emails.addAll(request.recipientEmails());
        }

        return emails;
    }
}
