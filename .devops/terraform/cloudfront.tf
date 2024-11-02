resource "aws_cloudfront_origin_access_control" "www" {
  name                              = local.domain
  description                       = local.domain
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
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
    allowed_methods = ["HEAD", "GET", "OPTIONS"]
    cached_methods  = ["HEAD", "GET", "OPTIONS"]

    compress               = true
    target_origin_id       = local.domain
    viewer_protocol_policy = "redirect-to-https"

    default_ttl = 60 * 60
    max_ttl     = 60 * 60 * 24
    min_ttl     = 60

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
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
    acm_certificate_arn      = aws_acm_certificate_validation.www.certificate_arn
    minimum_protocol_version = "TLSv1.2_2021"
    ssl_support_method       = "sni-only"
  }
}