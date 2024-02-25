package com.pth.taskbackend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "Pham Tan Hoang",
                        email = "phamtanhoang3202@gmail.com",
                        url = "https://github.com/phamtanhoang"
                ),
                description = "OpenApi documentation for Job App",
                title = "OpenApi specification",
                version = "1.0",
                license = @License(
                        name = "Link project",
                        url = "https://github.com/phamtanhoang/KhoaLuanTotNghiep/tree/main/task-backend"
                )
        ),
        servers = {
                @Server(
                        description = "Server URL in Development environment",
                        url = "${springdoc.openapi.dev-url}"
                ),
                @Server(
                        description = "Server URL in Production environment",
                        url = "${springdoc.openapi.prod-url}"
                )
        },
        security = {
                @SecurityRequirement(
                        name = "bearerAuth"
                )
        }
)
@SecurityScheme(
        name = "bearerAuth",
        description = "JWT auth description",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
//@SecurityScheme(name = "javainuseapi", scheme = "basic", type = SecuritySchemeType.HTTP, in = SecuritySchemeIn.HEADER)
public class OpenAPIConfig {
}