package vn.tuan_dao.springrestfulAPI.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app.cookie")
public class CookieProperties {

    /**
     * Bật Secure flag trên cookie refresh_token.
     * Đặt true khi deploy HTTPS (production), false khi dev HTTP.
     */
    private boolean secure = false;

    public boolean isSecure() {
        return secure;
    }

    public void setSecure(boolean secure) {
        this.secure = secure;
    }
}
