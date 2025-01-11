data "aws_iam_policy_document" "assume_role" {
  statement {
    sid     = "AllowLamdbdaToAssumeThisRole"
    actions = ["sts:AssumeRole"]

    principals {
      type = "Service"
      identifiers = [
        "lambda.amazonaws.com",
        "edgelambda.amazonaws.com"
      ]
    }
  }
}

resource "aws_iam_role" "main" {
  name               = "RouteLambdaExecutionRole"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

data "aws_iam_policy" "execution" {
  name = "AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "execution" {
  policy_arn = data.aws_iam_policy.execution.arn
  role       = aws_iam_role.main.name
}
