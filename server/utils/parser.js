const xml2js = require('xml2js');
const fs = require('fs').promises;

async function parseXML(filePath) {
    try {
        const xmlData = await fs.readFile(filePath, 'utf8');
        
        const parser = new xml2js.Parser({ explicitArray: false });
        const result = await parser.parseStringPromise(xmlData);
        
        const profileData = result.INProfileResponse;
        
        const basicDetails = {
            name: {
                firstName: profileData.Current_Application.Current_Application_Details.Current_Applicant_Details.First_Name || '',
                lastName: profileData.Current_Application.Current_Application_Details.Current_Applicant_Details.Last_Name || ''
            },
            mobilePhone: profileData.Current_Application.Current_Application_Details.Current_Applicant_Details.MobilePhoneNumber || '',
            pan: profileData.CAIS_Account.CAIS_Account_DETAILS[0].CAIS_Holder_Details.Income_TAX_PAN || '',
            creditScore: profileData.SCORE ? profileData.SCORE.BureauScore : ''
        };
        
        const summary = {
            totalAccounts: parseInt(profileData.CAIS_Account.CAIS_Summary.Credit_Account.CreditAccountTotal) || 0,
            activeAccounts: parseInt(profileData.CAIS_Account.CAIS_Summary.Credit_Account.CreditAccountActive) || 0,
            closedAccounts: parseInt(profileData.CAIS_Account.CAIS_Summary.Credit_Account.CreditAccountClosed) || 0,
            currentBalanceTotal: parseInt(profileData.CAIS_Account.CAIS_Summary.Total_Outstanding_Balance.Outstanding_Balance_All) || 0,
            securedAmount: parseInt(profileData.CAIS_Account.CAIS_Summary.Total_Outstanding_Balance.Outstanding_Balance_Secured) || 0,
            unsecuredAmount: parseInt(profileData.CAIS_Account.CAIS_Summary.Total_Outstanding_Balance.Outstanding_Balance_UnSecured) || 0,
            last7DaysEnquiries: parseInt(profileData.TotalCAPS_Summary.TotalCAPSLast7Days) || 0
        };
        
        const creditAccounts = profileData.CAIS_Account.CAIS_Account_DETAILS.map(account => ({
            accountType: account.Account_Type,
            bank: account.Subscriber_Name ? account.Subscriber_Name.trim() : '',
            accountNumber: account.Account_Number || '',
            amountOverdue: parseInt(account.Amount_Past_Due) || 0,
            currentBalance: parseInt(account.Current_Balance) || 0,
            address: {
                line1: account.CAIS_Holder_Address_Details.First_Line_Of_Address_non_normalized || '',
                line2: account.CAIS_Holder_Address_Details.Second_Line_Of_Address_non_normalized || '',
                line3: account.CAIS_Holder_Address_Details.Third_Line_Of_Address_non_normalized || '',
                city: account.CAIS_Holder_Address_Details.City_non_normalized || '',
                state: account.CAIS_Holder_Address_Details.State_non_normalized || '',
                pincode: account.CAIS_Holder_Address_Details.ZIP_Postal_Code_non_normalized || ''
            }
        }));
        
        const creditCards = creditAccounts.filter(account => account.accountType === '10');
        
        const uniqueAddresses = [...new Set(creditAccounts.map(account => 
            JSON.stringify(account.address)
        ))].map(addr => JSON.parse(addr));
        
        const structuredData = {
            basicDetails,
            reportSummary: summary,
            creditAccounts: {
                all: creditAccounts,
                creditCards: creditCards,
                addresses: uniqueAddresses
            },
            metadata: {
                reportDate: profileData.CreditProfileHeader.ReportDate,
                reportNumber: profileData.CreditProfileHeader.ReportNumber,
                reportTime: profileData.CreditProfileHeader.ReportTime
            }
        };
        fs.unlink(filePath)
        return structuredData;
        
    } catch (error) {
        console.error('Error parsing XML:', error);
        throw error;
    }
}

module.exports = parseXML;  