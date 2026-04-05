package vn.tuan_dao.springrestfulAPI.feature.email.dto;

import java.util.List;

public record EmailResponse(
        int totalRecipients,
        int successCount,
        List<String> failedEmails
) {}

