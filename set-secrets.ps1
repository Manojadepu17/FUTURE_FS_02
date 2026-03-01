# Fly.io Secrets Setup Script
# Replace the values with your actual Railway MySQL credentials

$secrets = @{
    "NODE_ENV" = "production"
    "DB_HOST" = "containers-us-west-xxx.railway.app"  # Replace with your MYSQLHOST
    "DB_PORT" = "6379"  # Replace with your MYSQLPORT
    "DB_NAME" = "railway"  # Replace with your MYSQLDATABASE
    "DB_USER" = "root"  # Replace with your MYSQLUSER
    "DB_PASSWORD" = "your-mysql-password"  # Replace with your MYSQLPASSWORD
    "JWT_SECRET" = "/aH1Xo0+ofRr/ZnU9CYWHz965eCUgfoU2NWDXtQdgZR5oNINkyDN396UL1aX/+vNWykbmKWw6GS1kHez7cZgFA=="
    "CLIENT_URL" = "https://your-app-name.fly.dev"  # Update after flyctl launch
}

Write-Host "`n🔐 Setting Fly.io secrets..." -ForegroundColor Cyan

foreach ($key in $secrets.Keys) {
    $value = $secrets[$key]
    Write-Host "Setting $key..." -ForegroundColor Yellow
    flyctl secrets set "$key=$value"
}

Write-Host "`n✅ All secrets set!" -ForegroundColor Green
Write-Host "`n💡 Remember to update CLIENT_URL after getting your Fly.io URL" -ForegroundColor Cyan
