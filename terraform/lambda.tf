data "aws_iam_policy" "basic_execution" {
  arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

data "aws_iam_policy_document" "assume_role" {
  statement {
    sid     = "AllowLamdbdaToAssumeThisRole"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "execute_api" {
  statement {
    effect = "Allow"
    actions = [
      "execute-api:ManageConnections"
    ]
    resources = [
      "${aws_apigatewayv2_api.webshell.execution_arn}/*"
    ]
  }
}

resource "aws_iam_role" "webshell_execution" {
  name                = "WebShellExecutionRole"
  assume_role_policy  = data.aws_iam_policy_document.assume_role.json
  managed_policy_arns = [data.aws_iam_policy.basic_execution.arn]

  inline_policy {
    name   = "execute-api"
    policy = data.aws_iam_policy_document.execute_api.json
  }
}

resource "aws_lambda_function" "webshell" {
  function_name = "webshell"
  architectures = ["arm64"]
  description   = "aedenmurray.dev"

  role    = aws_iam_role.webshell_execution.arn
  handler = "bin.handler"
  runtime = "nodejs16.x"

  filename         = "/tmp/webshell.zip"
  source_code_hash = filebase64sha256("/tmp/webshell.zip")
  memory_size      = 128
  timeout          = 10

  environment {
    variables = {
      "API_ID"    = aws_apigatewayv2_api.webshell.id
      "API_STAGE" = aws_apigatewayv2_stage.main.name
    }
  }
}

