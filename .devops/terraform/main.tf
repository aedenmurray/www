terraform {
  cloud {
    organization = "aedenmurray"

    workspaces {
      name = "www"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

locals {
  domain = "aedenmurray.dev"
}

module "cloudfront" {
  source = "./cloudfront"

  certificate_arn = aws_acm_certificate_validation.www.certificate_arn
  domain_s3       = aws_s3_bucket.www.bucket_regional_domain_name
  domain          = local.domain
}