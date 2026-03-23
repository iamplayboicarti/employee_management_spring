package vn.tuan_dao.springrestwithai.feature.email;

import vn.tuan_dao.springrestwithai.feature.email.dto.EmailResponse;
import vn.tuan_dao.springrestwithai.feature.email.dto.SendEmailRequest;

public interface EmailService {

    EmailResponse sendEmail(SendEmailRequest request);
}
