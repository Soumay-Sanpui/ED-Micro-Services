# USER SERVICE

- Register a new user
- Login
- Logout
- Get user details
- Update user details
- Delete user

scaled using nginx and by swaning multiple containers[containerized(user-service)] --> redis --> DB

## Command-Event pattern:
- frontend --> REST API Call --> internal event Trigger --> Controller.

- prometheus for analytics - grafana for visualization
- TurboRepo & nx for Monorepo Management 
- Shared packages and npm workspaces

## Spin Multiple Containers of the same service
## Workspaces for monorepos
- Not for distribution, better approach would be to use the workspace feature for development.
- In production each service should be deployed in its own container for independent scaling.