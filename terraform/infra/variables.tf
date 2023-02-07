variable "root_domain" {
  type        = string
  description = "Exact domain for SSL/TLS (eg depploy.io)"
}

variable "domain_name" {
  type        = string
  description = "Exact domain or subdomain for routing and SSL (eg console.depploy.io)"
}
