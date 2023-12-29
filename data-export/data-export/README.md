# Data Format

## Json Files

Each Json file represents data for a single company of a different size. "Fluffy Bunny Consulting" contains 100 employees, "Outback Technology" contains 500 companies, and "Nightwell Enterprise" contains 2500 employees.
Each file is a single Json array containing every employee for the company. Each element in the array looks something like this:
```json
{
  "firstName" : "Moshe",
  "lastName" : "Ferguson",
  "employeeId" : 2,
  "email" : "Moshe_Ferguson@fluffybunnyconsulting.com",
  "companyId" : 1,
  "companyName" : "Fluffy Bunny Consulting",
  "managerId" : 1,
  "positionTitle" : "Engineering Manager",
  "startDate" : "2016-05-04",
  "isManager" : true,
  "password" : "fergusonmo"
}
```

Descriptions for each field are as follows:
- firstName: The first name of the employee
- lastName: The last name of the employee
- employeeId: Unique identifier for the employee within the company. Within a company this is guaranteed to be unique but across companies employees may have the same identifier. A combination of companyId and employeeId is guaranteed to be unique across the full data set.
- email: Email address for the employee, may be used in combination with the password for authentication
- companyId: Unique identification number for the company that this employee belongs to
- companyName: The name of the company this employee works for
- managerId: employeeId for the manager of this employee. The CEO of a company is the only employee where this field is missing, all other employees will have this field defined.
- positionTitle: The name of the position this employee holds
- startDate: What date the employee started working for the company
- isManager: A boolean field for whether this employee is a manager or not
- password: A password that can be used to log into the system as this employee
