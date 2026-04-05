package vn.tuan_dao.springrestfulAPI.feature.email;

import vn.tuan_dao.springrestfulAPI.feature.email.dto.EmailResponse;
import vn.tuan_dao.springrestfulAPI.feature.email.dto.SendEmailRequest;

public interface EmailService {

    EmailResponse sendEmail(SendEmailRequest request);
}

