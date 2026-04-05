package vn.tuan_dao.springrestfulAPI.feature.email.dto;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record SendEmailRequest(
        @NotBlank(message = "Tiêu đề email không được để trống")
        String subject,

        @NotBlank(message = "Nội dung email không được để trống")
        String body,

        List<Long> recipientIds,

        List<String> recipientEmails
) {}

