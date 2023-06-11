# API Template
A Typescript Express service with basic configuration that can be used across a variety of projects.  The template includes set up that is typical of most projects (logging, error handling, etc...) but doesn't take it too far.

`src/recipes/` is a sample route which remains fairly sparse but an example of how to leverage the basic structure.


## Getting Started
1. Run `npm install`
2. Update package.json with appropriate values for the service (e.g. name, license, etc...)
3. Create a new `.env` and add any needed variables
4. Run `npm run dev` - this builds the application and starts nodemon.

## Configuration
Configuration is heavily inspired by node-convict but without all the config syncing.  It takes a configuration object that can have defaults, allowed values and overridden by env vars.

### Setting Config
appConfig takes an object with config objects.  Each config object is made up of:

```javascript
{
  default: any, // Default if not overridden
  env: string, // The env var on process.env
  allowed: any[], // A collection of allowed values.
}
```

Configs can be nested for easier management:
```javascript
{
  db: {
    password: {
      default: '',
      env: 'DB_PASSWORD'
    }
  }
}
```

`dotenv` is used to grab env vars.  Create a `.env` file to store variables.

### Retrieving Values
Use `config.get('<value>')` to retrieve the value.  It will return `null` if a value is not found.

`.get` takes a string.  Dot notation is supported so its easier to access nested variables: `config.get('db.password')`

## Middleware
When using middleware to decorate a request for use in downstream controllers, the standard Express Request needs to be modified.  This has already been done for logging so reference `src/common/types/express/` for the pattern.

For example, this is useful when wanting to pass database connection info or user authorization info for all requests.

## Logging
The service uses a custom logger with middleware.  The middleware 

The logger supports `error`, `warn`, `info`, `debug` log levels and outputs log messages in JSON.

### Decorating Log Messages
#### Log Attributes
Every log messages can be decorated with custom attributes added to the JSON output.  Include it as part of the second argument:

```javascript
req.log.info('This is a sample message', { id: '1234', hello: 'world' })
```

#### Default Decorators
The logger can be configured to attach a value on every log message once the value has been set..  This is handy for things like attaching transaction ids so they are logged everywhere.

Set a middleware *after* the `logMiddleware()` has been set.  Since this will be custom for every application, a sample middleware is included but not added.  Instead, feel free to copy this one and place it directly after the logMiddleware.

```typescript
// app.use(logMiddleware(logger))
app.use((req: Request, res: Response, next: NextFunction) => {
  req.logger.decorate({ trace: req.headers.transactionId })
})
```

## Error Handling
There is a custom error handler and error logger.  The logger will always log the error.

The error handler will send appropriately formatted error responses depending on the type of error.  This allows for much greater consistency.  Rather than formatting errors within the various controllers, just throw use the appropriate error for the situation.

### Known errors & API responses
The error handler will respond to the errors and provide the relevant http code that is contained in the error.  If no code is provided, it will send a 500.

In the controller, pass the error along with `next`.  The error handler will pass the message along with the appropriate http code.
```javascript
async function get(req, res, next) {
  // ...other controller code
  next(new NotFoundError({ message: 'No records were found'}))
}
```

### Creating New Errors
Some common errors have already been provided but new ones can be added.  Reference `/src/common/types/server/errors.ts` for patterns.