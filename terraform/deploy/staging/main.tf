locals {
  root_domain   = "depploy.io"
  domain_name   = "console.staging.depploy.io"
}

provider "aws" {
  region = "us-east-1"
}

module "aws_deployment" {
  source                 = "../../infra"
  root_domain            = local.root_domain
  domain_name            = local.domain_name
}
