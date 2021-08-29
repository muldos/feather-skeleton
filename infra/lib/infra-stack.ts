import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";
import * as path from "path";

export class FeatherNodeStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const featherApp = new lambda.Function(this, "FeatherLambda", {
      code: lambda.Code.fromAsset(
        path.join(__dirname, "../../application/lambda.zip")
      ),
      handler: "lambda.handler",
      runtime: lambda.Runtime.NODEJS_14_X,
    });

    new apigw.LambdaRestApi(this, "FeatherEndpoint", {
      handler: featherApp,
      deployOptions: {
        stageName: "api",
      },
    });
  }
}
