# flight-planner-playwright-tests  
```flight-planner-playwright-tests/tests/random-flight-path.spec.ts```  

![Test Preview](images/screenshot-example.png)

## File Structure (example)
```
playwright-tests/
├── tests/
│   ├── login.spec.ts
│   ├── login-invalid.spec.ts
│   └── ...                  # Other small tests
│
├── pages/
│   └── login.page.ts
│
├── .gitignore
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```
## Running Playwright
```bash
# Run all tests  
npx playwright test  

# Run a specific test  
npx playwright test my-test.spec.ts  

# Run a test by title  
npx playwright test -g "should add a waypoint"  

# Run tests in headed mode  
npx playwright test --headed  

# Run tests in debug mode  
npx playwright test --debug  

# Run tests in UI mode  
npx playwright test --ui  

# Run tests for specific browser  
npx playwright test --project=chromium  
```

## Installing Playwright
```bash
npm init playwright@latest  
npx playwright test  
npx playwright show-report  
```

## Updating Playwright
```bash
npm install -D @playwright/test@latest  
npx playwright install --with-deps  
npx playwright --version  
```
