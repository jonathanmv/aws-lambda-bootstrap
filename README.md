# aws lambda bootstrap

Base project to deploy one lambda that can execute many operations.
In your aws lambda function you should deploy this single code base. The handler will look for an event.type property and will try to load a javascript file with the same name from the _src/functions/_. The file should export one function that receives an event and a context. It should call context.succeed or context.fail as any other lambda.

# Technologies

es6, mocha

# Goals

- Written in es6
- Support multiple operations (One lambda can handle many event types)
- Include tests
- Include deployment script

# Setup

In order to be able to deploy using `npm run deploy` you need to replace `[YOUR_LAMBDA_FUNCTION_NAME]` with your function's name in the package.json file.

# Available commands

- `npm run build` Transpiles the code and puts it in the _build/index_ folder. It also creates a deployable _index.zip_ file
- `npm run deploy` Builds the code, zips it and deploys it to aws using the aws cli
- `npm run upload-and-test` Deploys the code and invokes the function without payload. It saves the output in the _build/invoke_output.txt_ file. It also shows the result in the console
