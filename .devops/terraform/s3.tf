resource "aws_s3_bucket" "www" {
  bucket = "dev.aedenmurray.www"
}

resource "aws_s3_bucket_acl" "www" {
  bucket = aws_s3_bucket.www.id
  acl    = "private"
}

resource "aws_s3_bucket_public_access_block" "www" {
  bucket                  = aws_s3_bucket.www.bucket
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

module "www_files" {
  source   = "hashicorp/dir/template"
  base_dir = "/tmp/www"
}

resource "aws_s3_object" "www" {
  bucket   = aws_s3_bucket.www.bucket
  for_each = module.www_files.files

  key     = each.key
  source  = each.value.source_path
  content = each.value.content

  etag          = each.value.digests.md5
  content_type  = each.value.content_type
  cache_control = "max-age=0"
}

resource "aws_s3_bucket_website_configuration" "www" {
  bucket = aws_s3_bucket.www.bucket

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

data "aws_iam_policy_document" "cloudfront_access" {
  statement {
    sid     = "AllowCloudFrontServicePrincipalReadOnly"
    actions = ["s3:GetObject"]

    resources = [
      aws_s3_bucket.www.arn,
      "${aws_s3_bucket.www.arn}/*"
    ]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.www.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "www" {
  bucket = aws_s3_bucket.www.id
  policy = data.aws_iam_policy_document.cloudfront_access.json
}