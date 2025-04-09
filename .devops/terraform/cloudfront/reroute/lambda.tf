data "archive_file" "main" {
  type        = "zip"
  source_file = "${path.module}/reroute.js"
  output_path = "/tmp/www-reroute.zip"
}

resource "aws_lambda_function" "main" {
  function_name = "www-reroute"
  role          = aws_iam_role.main.arn
  publish       = true

  source_code_hash = filebase64sha256(data.archive_file.main.output_path)
  filename         = data.archive_file.main.output_path
  handler          = "reroute.handler"
  runtime          = "nodejs22.x"
}

resource "aws_cloudwatch_log_group" "main" {
  name              = "/aws/lambda/us-east-1.${aws_lambda_function.main.function_name}"
  retention_in_days = 1
}
