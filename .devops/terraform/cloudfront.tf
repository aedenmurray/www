resource "aws_cloudfront_origin_access_control" "www" {
  name                              = local.domain
  description                       = local.domain
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

data "aws_cloudfront_cache_policy" "main" {
  name = "Managed-CachingOptimized"
}

resource "aws_cloudfront_distribution" "www" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  comment             = local.domain

  aliases = [
    local.domain,
    "www.${local.domain}"
  ]

  origin {
    origin_id                = local.domain
    domain_name              = aws_s3_bucket.www.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.www.id
  }

  default_cache_behavior {
    cache_policy_id        = data.aws_cloudfront_cache_policy.main.id
    allowed_methods        = ["HEAD", "GET", "OPTIONS"]
    cached_methods         = ["HEAD", "GET", "OPTIONS"]
    viewer_protocol_policy = "redirect-to-https"
    target_origin_id       = local.domain
    compress               = true
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
    acm_certificate_arn      = aws_acm_certificate_validation.www.certificate_arn
    minimum_protocol_version = "TLSv1.2_2021"
    ssl_support_method       = "sni-only"
  }
}