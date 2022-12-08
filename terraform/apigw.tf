resource "aws_apigatewayv2_api" "webshell" {
  name                       = "webshell"
  protocol_type              = "WEBSOCKET"
  route_selection_expression = "$request.body.action"
}

resource "aws_apigatewayv2_integration" "webshell" {
  api_id             = aws_apigatewayv2_api.webshell.id
  integration_uri    = aws_lambda_function.webshell.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "connect" {
  api_id    = aws_apigatewayv2_api.webshell.id
  target    = "integrations/${aws_apigatewayv2_integration.webshell.id}"
  route_key = "$connect"
}

resource "aws_apigatewayv2_route" "default" {
  api_id    = aws_apigatewayv2_api.webshell.id
  target    = "integrations/${aws_apigatewayv2_integration.webshell.id}"
  route_key = "$default"

  depends_on = [
    aws_apigatewayv2_route.connect
  ]
}

resource "aws_apigatewayv2_stage" "main" {
  api_id      = aws_apigatewayv2_api.webshell.id
  name        = "main"
  auto_deploy = true
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  principal     = "apigateway.amazonaws.com"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.webshell.function_name
  source_arn    = "${aws_apigatewayv2_api.webshell.execution_arn}/*/*"
}

resource "aws_apigatewayv2_domain_name" "webshell" {
  domain_name = "ws.${local.domain}"

  domain_name_configuration {
    certificate_arn = aws_acm_certificate_validation.www.certificate_arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

resource "aws_apigatewayv2_api_mapping" "webshell" {
  api_id      = aws_apigatewayv2_api.webshell.id
  domain_name = aws_apigatewayv2_domain_name.webshell.id
  stage       = aws_apigatewayv2_stage.main.id
}