# Email Feature — Context

## Mục đích
Cho phép HR gửi email cho một hoặc nhiều nhân viên trực tiếp từ hệ thống.

## Endpoint
`POST /api/v1/emails/send`

## Request
- `subject` (bắt buộc): Tiêu đề email
- `body` (bắt buộc): Nội dung email
- `recipientIds` (tuỳ chọn): Danh sách ID nhân viên — service tự lookup email từ DB
- `recipientEmails` (tuỳ chọn): Danh sách email trực tiếp
- Ít nhất một trong hai phải có giá trị

## Response
- `totalRecipients`: Tổng số địa chỉ email (sau dedup)
- `successCount`: Số email gửi thành công
- `failedEmails`: Danh sách email gửi thất bại

## Thiết kế
- Dùng `JavaMailSender` (Spring Boot auto-configure qua `spring.mail.*` trong application.yml)
- Dedup bằng `LinkedHashSet` để giữ thứ tự và loại trùng
- Gửi từng email trong vòng lặp, catch `MailException` per email để không fail toàn bộ
- Failure được log ở mức WARN, không throw exception

## Phân quyền
Được bảo vệ bởi `PermissionAuthorizationManager`. Cần tạo Permission record:
- name: "Gửi email cho nhân viên"
- apiPath: `/api/v1/emails/send`
- method: `POST`
- module: `EMAIL`

Sau đó assign cho Role HR qua API quản lý role.

## SMTP Config
Gmail SMTP qua biến môi trường `MAIL_USERNAME` và `MAIL_PASSWORD` (Gmail App Password).
