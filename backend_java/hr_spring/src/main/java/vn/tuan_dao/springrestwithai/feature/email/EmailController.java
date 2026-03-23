package vn.tuan_dao.springrestwithai.feature.email;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.tuan_dao.springrestwithai.dto.ApiResponse;
import vn.tuan_dao.springrestwithai.feature.email.dto.EmailResponse;
import vn.tuan_dao.springrestwithai.feature.email.dto.SendEmailRequest;

@RestController
@RequestMapping("/api/v1/emails")
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send")
    public ResponseEntity<ApiResponse<EmailResponse>> send(
            @Valid @RequestBody SendEmailRequest request) {
        EmailResponse response = emailService.sendEmail(request);
        return ResponseEntity.ok(ApiResponse.success("Gửi email thành công", response));
    }
}
