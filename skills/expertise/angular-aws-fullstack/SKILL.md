---
name: angular-aws-fullstack
description: Angular frontend + Fastify backend + AWS deployment patterns and best practices
---

<principles>
## Core Principles

### Project Structure
```
project-root/
├── frontend/           # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/      # Singletons, guards, interceptors
│   │   │   ├── shared/    # Reusable components, directives, pipes
│   │   │   ├── features/  # Feature modules (lazy-loaded)
│   │   │   └── models/    # TypeScript interfaces/types
│   │   ├── assets/
│   │   └── environments/
│   └── angular.json
├── backend/            # Fastify API
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   ├── plugins/       # Fastify plugins
│   │   ├── services/      # Business logic
│   │   ├── schemas/       # JSON Schema validation
│   │   └── utils/         # Helpers
│   └── package.json
└── infrastructure/     # AWS CDK or CloudFormation
    └── ...
```

### Angular Conventions
- **Component organization**: Smart (container) vs Dumb (presentational) components
- **Naming**: feature.component.ts, feature.service.ts, feature.module.ts
- **State management**: Services with RxJS for simple apps, NgRx for complex state
- **Routing**: Lazy load feature modules for performance
- **Change detection**: OnPush strategy for performance-critical components
- **TypeScript**: Strict mode enabled, interfaces for all data models

### Fastify Patterns
- **Route organization**: Group by feature/resource (users/, auth/, items/)
- **Plugin pattern**: Encapsulate functionality as Fastify plugins
- **Validation**: Use JSON Schema for request/response validation (@fastify/swagger)
- **Error handling**: Centralized error handler, consistent error responses
- **Hooks**: preHandler, onRequest, onResponse for cross-cutting concerns
- **TypeScript**: Typed route handlers with generics for type safety

### API Design
- **RESTful conventions**: GET, POST, PUT, DELETE with proper status codes
- **Request format**: JSON body, URL params for IDs, query params for filters
- **Response format**: Consistent structure with data, error, metadata
- **Authentication**: JWT in Authorization header (Bearer token)
- **CORS**: Configure properly for Angular origin in development/production
- **Versioning**: URL prefix (/api/v1/) or Accept header

### AWS Integration Patterns
- **API Gateway + Lambda**: Serverless Fastify handler
- **S3**: Static Angular app hosting with CloudFront
- **DynamoDB**: NoSQL data storage with single-table design
- **Cognito**: User authentication and authorization
- **CloudWatch**: Logging and monitoring
- **Secrets Manager**: Store sensitive configuration

### TypeScript Best Practices
- **Strict mode**: Enable all strict compiler options
- **Interfaces over types**: Use interfaces for object shapes
- **Avoid any**: Use unknown with type guards instead
- **Enums vs const objects**: Prefer const objects for string unions
- **Path aliases**: Configure @app/, @shared/ for clean imports

### Testing Approaches
- **Angular**: Jasmine + Karma for unit tests, Cypress for E2E
- **Fastify**: tap or Vitest for unit/integration tests
- **Test structure**: AAA pattern (Arrange, Act, Assert)
- **Mocking**: Avoid over-mocking, prefer integration tests
- **Coverage**: Aim for 80%+ on business logic, less on boilerplate

### Common Gotchas
- **CORS issues**: Configure Fastify CORS plugin with correct Angular origin
- **Observable subscriptions**: Always unsubscribe in ngOnDestroy
- **Fastify context**: Use request.log for logging, not console.log
- **AWS cold starts**: Keep Lambda handlers lightweight
- **DynamoDB queries**: Design access patterns before creating tables
- **Angular prod builds**: Use --configuration production for optimizations

</principles>

<references_index>
## Reference Loading Guide

When planning phases, load references based on phase type:

**For Angular/Frontend phases:**
- references/angular-components.md - Component patterns, lifecycle, communication
- references/angular-routing.md - Routing, lazy loading, guards
- references/angular-state.md - State management approaches (services, NgRx)

**For Fastify/Backend phases:**
- references/fastify-routes.md - Route organization, handlers, validation
- references/fastify-plugins.md - Plugin development, hooks, lifecycle

**For API/Integration phases:**
- references/api-design.md - REST conventions, authentication, error handling
- references/aws-services.md - Lambda, API Gateway, DynamoDB, S3 patterns

**For Database/Persistence phases:**
- references/dynamodb-patterns.md - Single-table design, access patterns, queries
- references/data-modeling.md - TypeScript models, DTOs, validation

**For Testing phases:**
- references/angular-testing.md - Component testing, service testing, E2E
- references/fastify-testing.md - Route testing, plugin testing, mocking

**For Deployment/Infrastructure phases:**
- references/aws-deployment.md - CDK, CloudFormation, CI/CD patterns
- references/environment-config.md - Environment variables, secrets management

**Always useful (load for any phase):**
- references/typescript-patterns.md - Common TS patterns, type utilities
- references/error-handling.md - Error handling across the stack

**Phase type examples:**
- "Set up Angular app" → angular-components.md, typescript-patterns.md
- "Create API endpoints" → fastify-routes.md, api-design.md
- "Add authentication" → api-design.md, aws-services.md (Cognito)
- "Deploy to AWS" → aws-deployment.md, environment-config.md
</references_index>

<workflows>
## Optional Workflows

This domain does not provide custom workflows. Use the standard create-plans workflows.
</workflows>
