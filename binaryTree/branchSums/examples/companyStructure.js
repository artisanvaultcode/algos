class Employee {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
        this.directReports = [];  // Can have multiple direct reports
    }

    addDirectReport(employee) {
        this.directReports.push(employee);
        return this;
    }
}

function calculateTeamCosts(ceo) {
    if (!ceo) return [];

    const teamCosts = [];
    const stack = [{
        employee: ceo,
        totalCost: 0,
        path: [ceo.name]
    }];

    while (stack.length > 0) {
        const {employee, totalCost, path} = stack.pop();
        const currentCost = totalCost + employee.salary;

        // If this is a leaf (no direct reports), add the chain's total
        if (employee.directReports.length === 0) {
            teamCosts.push({
                reportingChain: [...path],
                totalSalaryCost: currentCost
            });
            continue;
        }

        // Add direct reports to stack
        for (const report of employee.directReports) {
            stack.push({
                employee: report,
                totalCost: currentCost,
                path: [...path, report.name]
            });
        }
    }

    return teamCosts;
}

// Create company structure
const ceo = new Employee("John (CEO)", 200000);
const cto = new Employee("Alice (CTO)", 180000);
const cfo = new Employee("Bob (CFO)", 180000);
const devManager = new Employee("Carol (Dev Manager)", 150000);
const financeManager = new Employee("Dave (Finance Manager)", 150000);
const seniorDev1 = new Employee("Eve (Senior Dev)", 120000);
const seniorDev2 = new Employee("Frank (Senior Dev)", 120000);
const accountant1 = new Employee("Grace (Accountant)", 90000);
const accountant2 = new Employee("Henry (Accountant)", 90000);

// Build the reporting structure
ceo.addDirectReport(cto)
    .addDirectReport(cfo);

cto.addDirectReport(devManager);
cfo.addDirectReport(financeManager);

devManager.addDirectReport(seniorDev1)
    .addDirectReport(seniorDev2);

financeManager.addDirectReport(accountant1)
    .addDirectReport(accountant2);

/*
Company Structure:
                 John (CEO) $200k
                /            \
    Alice (CTO) $180k    Bob (CFO) $180k
           |                  |
Carol (Dev Mgr) $150k    Dave (Fin Mgr) $150k
        /     \              /          \
Eve $120k  Frank $120k  Grace $90k    Henry $90k
*/

// Calculate and display all reporting chain costs
const results = calculateTeamCosts(ceo);

console.log("Reporting Chain Analysis:");
results.forEach(({reportingChain, totalSalaryCost}) => {
    console.log(`\nChain: ${reportingChain.join(" → ")}`);
    console.log(`Total Cost: $${totalSalaryCost.toLocaleString()}`);
});

// Calculate total company salary
const totalCompanySalary = results.reduce((total, chain) => {
    // Only add leaf node salaries to avoid double counting
    return total + chain.reportingChain[chain.reportingChain.length - 1].split(' ')[0];
}, 0);

console.log(`\nTotal Company Salary: $${totalCompanySalary.toLocaleString()}`);