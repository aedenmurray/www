module "reroute" {
  source = "./reroute"
}

data "aws_cloudfront_cache_policy" "www" {
  name = "Managed-CachingOptimized"
}

data "aws_cloudfront_response_headers_policy" "www" {
  name = "Managed-SecurityHeadersPolicy"
}

resource "aws_cloudfront_origin_access_control" "www" {
  name                              = var.domain
  description                       = var.domain
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "www" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  comment             = var.domain

  aliases = [
    "www.${var.domain}",
    var.domain,
  ]

  origin {
    origin_id                = var.domain
    domain_name              = var.domain_s3
    origin_access_control_id = aws_cloudfront_origin_access_control.www.id
  }

  default_cache_behavior {
    cache_policy_id            = data.aws_cloudfront_cache_policy.www.id
    response_headers_policy_id = data.aws_cloudfront_response_headers_policy.www.id
    allowed_methods            = ["HEAD", "GET", "OPTIONS"]
    cached_methods             = ["HEAD", "GET", "OPTIONS"]
    viewer_protocol_policy     = "redirect-to-https"
    target_origin_id           = var.domain
    compress                   = true

    lambda_function_association {
      event_type   = "viewer-request"
      lambda_arn   = module.reroute.qualified_arn
      include_body = false
    }
  }

  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  viewer_certificate {
    acm_certificate_arn      = var.certificate_arn
    minimum_protocol_version = "TLSv1.2_2021"
    ssl_support_method       = "sni-only"
  }
}