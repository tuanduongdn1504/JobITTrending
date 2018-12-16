# -*- coding: utf-8 -*-
"""
Created on Tue Dec 11 15:39:20 2018

@author: GL63
"""

# -*- coding: utf-8 -*-
"""
Created on Wed Oct 24 14:40:54 2018

@author: nguyendhn
"""
import re

from bs4 import BeautifulSoup
import requests
import pandas as pd
import json
import math
import pymongo
import datetime
import time as ti


def handleSalary(salary):
    # Using non-capturing grou
    # https://stackoverflow.com/questions/18425386/re-findall-not-returning-full-match
    # 500-700$;  2000$; 700-1,2000$; 1.500
    listOfAmount = re.findall(r'\d+(?:,|\.)?\d*', salary)
    listOfAmount = [int(re.sub(r'(?:,|\.)*', "", amount))
                    for amount in listOfAmount]  # remove . or ,
    if not listOfAmount:
        return 0
    else:
        return sum(listOfAmount) / len(listOfAmount)


home_url = "https://itviec.com"
main_url = "https://itviec.com/it-jobs/"
base_url = "https://itviec.com/it-jobs?page="

session_requests = requests.session()

login_url = 'https://itviec.com/sign_in'
login_page_response = session_requests.get(login_url)
login_page_soup = BeautifulSoup(login_page_response.text, 'html.parser')
authenticity_token = login_page_soup.find(
    "input", {"name": "authenticity_token"}).get('value')
payload = {
    "utf8": "✓",
    "authenticity_token": authenticity_token,
    "user[email]": "friedfrog.frogsleap@gmail.com",
    "user[password]": "ABcd1234",
    "sign_in_then_review": "false",
    "commit": "Sign in",
}

result = session_requests.post(
    url=login_url,
    data=payload,
    headers={
        'X-Requested-With': 'XMLHttpRequest'
    }
)
result_json = json.loads(result.text)  # convert response to json

companies = []
jobs = []
language_tags = []
times = []
salaries = []
locations = []
top_3_reasons = []
jobs_description = []
experience = []
jobs_benefits = []
links = []
page = 1
keywords = set((pd.read_csv('jobs.txt', sep="\n", header=None))[0])

if result_json['success']:
    while True:
        response = session_requests.get(base_url + str(page))
        soup = BeautifulSoup(response.text, 'html.parser')
        checkNotFoundInTitle = soup.find("title")
        if checkNotFoundInTitle.text.find(
                "not found") >= 0:  # it returns -1 if the string not found, otherwise returns the position (
            # positive number)
            break

        jobs_containers = soup.find_all("div", attrs={'class': 'first-group'})
        for jobs_container in jobs_containers:
            divJobContainers = jobs_container.find_all(
                "div", attrs={'class': 'job'})
            for job in divJobContainers:

                 # Find distance time
                distance_time = job.select_one(
                    '.distance-time').text.split(' ', 2)
                current_time = datetime.datetime.now()
                if distance_time[1].find("hour") >= 0:
                    distance_time = int(distance_time[0])
                    deviation_time = datetime.timedelta(days=0)
                else:
                    break

                    # UNCOMMENT THIS LINE OF CODE IN CASE OF CRAWLING ALL DATA FROM THE FIRST TIME
                    # =============================================================================
                    #distance_time = int(distance_time[0])
                    #deviation_time = datetime.timedelta(days=distance_time)
                    # =============================================================================
                time = (current_time - deviation_time).strftime('%d-%m-%Y')
                times.append(time)

                # Find company name from alt of logo img
                img = job.find("img", alt=True)
                name = img['alt'][:-11]
                companies.append(name)

                # Find salary
                salary = job.find(
                    "span", attrs={'class': 'salary-text'}).getText()
                salary = handleSalary(salary)

                salaries.append(salary)

                # =============================================================================
                # soup.select('div')
                # All elements named <div>
                #
                # soup.select('#author')
                # The element with an id attribute of author
                #
                # soup.select('.notice')
                # All elements that use a CSS class attribute named notice
                #
                # soup.select('div span')
                # All elements named <span> that are within an element named <div>
                #
                # soup.select('div > span')
                # All elements named <span> that are directly within an element named <div>, with no other element in between
                #
                # soup.select('input[name]')
                # All elements named <input> that have a name attribute with any value
                #
                # soup.select('input[type="button"]')
                # All elements named <input> that have an attribute named type with value button
                # =============================================================================

                # Find jobs
                test = job.select_one('h2 a').getText()
                jobName = job.select_one('h2 a').getText(
                ).lower().replace("-", "").replace("/", "")
                jobName = re.sub(r'\([^()]*\)', '', jobName)
                isChanged = False
                for keyword in keywords:
                    if keyword.lower() in jobName:
                        #print(jobName, "to", keyword)
                        jobName = keyword
                        isChanged = True
                        break
                if isChanged == False:
                    jobName = "other"
                print(test, "to", jobName)
                jobs.append(jobName)

                # Find related languages
                jobtags = job.select('a span')
                languages = [tag.text.rstrip('\n').lstrip('\n')
                             for tag in jobtags]
                language_tags.append(languages)

                # Go to detail page to get the description
                link_container = job.find("h2", class_="title")
                link = link_container.a.get("href")
                job_url = home_url + link
                links.append(job_url)
                job_detail_response = session_requests.get(job_url)
                job_detail_soup = BeautifulSoup(
                    job_detail_response.text, 'html.parser')

                # Get more info about companies
                locations_container = job_detail_soup.find_all(
                    "div", class_="address__full-address")
                addresses = []
                for location in locations_container:
                    address = location.find("span")
                    if address is not None:
                        address = address.getText()
                    else:
                        address = location.getText().rstrip('\n').lstrip('\n')
                    addresses.append(address)
                locations.append(addresses)

                # Another way to get company's name
                # company_name = job_detail_soup.select_one("div.employer-info a").text

                # Get top 3 reasons
                top_3_reasons_container = job_detail_soup.select(
                    "div.top-3-reasons li")
                reasons = [reason.text.replace("-", " ")
                           for reason in top_3_reasons_container]
                reasons = " ".join(reasons)
                top_3_reasons.append(reasons)

                # Get job description
                job_description_container = job_detail_soup.select(
                    "div.description li")
                job_description = [criteria.text.replace(
                    "-", " ") for criteria in job_description_container]
                if not job_description:
                    job_description_container = job_detail_soup.select(
                        "div.description p")
                    job_description = [criteria.text.replace(
                        "-", " ") for criteria in job_description_container]
                job_description = " ".join(job_description)
                jobs_description.append(job_description)

                # Get experience
                job_exp_container = job_detail_soup.select("div.experience li")
                job_exp = [criteria.text.replace(
                    "-", " ") for criteria in job_exp_container]
                if not job_exp:
                    job_exp_container = job_detail_soup.select(
                        "div.description p")
                    job_exp = [criteria.text.replace(
                        "-", " ") for criteria in job_exp_container]
                job_exp = " ".join(job_exp)
                experience.append(job_exp)

                # Get benefits
                job_benefits_container = job_detail_soup.select(
                    "div.culture_description li")
                job_benefits = [criteria.text.replace(
                    "-", " ") for criteria in job_benefits_container]
                if not job_benefits:
                    job_benefits_container = job_detail_soup.select(
                        "div.description p")
                    job_benefits = [criteria.text.replace(
                        "-", " ") for criteria in job_benefits_container]
                job_benefits = " ".join(job_benefits)
                jobs_benefits.append(job_benefits)

        page = page + 1

else:
    print("Can not get data")

####Cua Phuc na`
rows = []

#########################
#url and response
for i in range(30):
    url = 'https://jf8q26wwud-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.30.0%3BJS%20Helper%202.26.1&x-algolia-application-id=JF8Q26WWUD&x-algolia-api-key=2bc790c0d4f44db9ab6267a597d17f1a'
    params ={"requests":[{"indexName":"vnw_job_v2_topitworks","params":"query=&hitsPerPage=1&maxValuesPerFacet=1&page=" + str(i) + "&facets=%5B%22type%22%2C%22locations%22%2C%22jobLevel%22%2C%22skills%22%2C%22company%22%2C%22salaryMax%22%2C%22salaryMin%22%2C%22publishedDate%22%2C%22categoryIds%22%2C%22jobSalary%22%2C%22isSalaryVisible%22%5D&numericFilters=%5B%5B%22categoryIds%3D35%22%2C%22categoryIds%3D55%22%5D%5D"}]}
    data = json.dumps(params)
    response = requests.post(url, headers = {"Content-type": "application/json"}, data = data)
    dm = response.json()
    results = json.loads(json.dumps(dm["results"]))
    
    #hits
    hits_json = json.loads(json.dumps(results[0]["hits"]))
    #online date
    onlineDate = hits_json[0]["onlineDate"]
    onlineDate = ti.strftime('%Y-%m-%d', ti.localtime(onlineDate))
    
    #get time
    now = datetime.datetime.now()
    now = now.strftime("%Y-%m-%d")
    
    if onlineDate == now:
        benefits = hits_json[0]["benefits"]
        listBenefits = []
        for benefit in benefits:
            benefitName = benefit["benefitName"]
            benefitValue =  benefit["benefitValue"]
            listBenefits.append(benefitName + " : " + benefitValue)
            
        #Job title
        jobTitle = (hits_json[0]["jobTitle"]).lower().replace("-", "").replace("/", "")
        jobTitle =  re.sub(r'\([^()]*\)', '', jobTitle)
        isChanged = False
        other = 0
        for keyword in keywords:
            if keyword.lower() in jobTitle:
                #print(jobName, "to", keyword)
                jobTitle = keyword
                isChanged = True
                break
        if isChanged == False:
            jobTitle = "other"
        print(jobTitle)
        #Expired time
        expiredTime = hits_json[0]["expiredDate"]
        expiredTime = ti.strftime('%Y-%m-%d', ti.localtime(expiredTime))
        
        #categoryVIs
        categoryVIs = hits_json[0]["categoryVIs"]
        for categoryVI in categoryVIs:
            categories = categoryVI
            
        #skills
        skills = hits_json[0]["skills"]
        for skill in skills:
            skillRequired = skill
            
        #check if salary visible
        isSalaryVisible = hits_json[0]["isSalaryVisible"]
        if isSalaryVisible == False:
            salary = 0
        else:
            salaryMin = hits_json[0]["salaryMin"]
            salaryMax = hits_json[0]["salaryMax"]
            salary = str((salaryMin+salaryMax)/2)
        
        #position
        position = hits_json[0]["jobLevelVI"]
        
        #company
        company = hits_json[0]["company"]
        
        #location
        location = hits_json[0]["locations"]
        
        #jobDescription
        jobDescription = hits_json[0]["jobDescription"]
        
        #jobRequirement
        jobRequirement = hits_json[0]["jobRequirement"]
        
        rows.append({
        'company': company,
        'job': jobTitle,
        'salary': float(salary),
        'location': location,
        'link': "Find more details in: https://www.topitworks.com/vi/",
        'time': onlineDate})
# =============================================================================
# COMMENT THIS LINE OF CODE IN CASE OF CRAWLING ALL DATA FROM THE FIRST TIME
# =============================================================================
    # Company df
df = pd.DataFrame({
    'company': companies,
    'job': jobs,
    'salary': salaries,
    'location': locations,
    'link': links,
    'time': times
}).append(rows, ignore_index = True)
# companies.to_excel('data.xlsx', sheet_name='data', index=False)
# df.to_csv("C:/Users/nguyendhn/OneDrive/Desktop Synchronization/out.csv", encoding="utf-8")

if not df.empty:
# Handle data missing (salary)
    for (i, row) in df.iterrows():
        if row['salary'] == 0:
            job = row['job']
            mean_salary = df.loc[(df['job'] == job) & (
                df['salary'] != 0), 'salary'].mean()
            if math.isnan(mean_salary):
                mean_salary = df['salary'].mean()
            df.loc[i, 'salary'] = mean_salary
    
    
    # =============================================================================
    # Import to Mongodb
    connectionString = "mongodb://admin:ABcd1234@ds237989.mlab.com:37989/job-trending-db"
    client = pymongo.MongoClient(connectionString)
    db = client.get_database()
    data_db = db['companies']
    data_db.insert_many(df.to_dict('records'))
    print("Done")
    client.close()
    
    # =============================================================================
    
# -*- coding: utf-8 -*-
"""
Created on Tue Dec 11 15:39:20 2018

@author: GL63
"""

# -*- coding: utf-8 -*-
"""
Created on Wed Oct 24 14:40:54 2018

@author: nguyendhn
"""
import re

from bs4 import BeautifulSoup
import requests
import pandas as pd
import json
import math
import pymongo
import datetime
import time as ti
from slugify import slugify


def handleSalary(salary):
    # Using non-capturing grou
    # https://stackoverflow.com/questions/18425386/re-findall-not-returning-full-match
    # 500-700$;  2000$; 700-1,2000$; 1.500
    listOfAmount = re.findall(r'\d+(?:,|\.)?\d*', salary)
    listOfAmount = [int(re.sub(r'(?:,|\.)*', "", amount))
                    for amount in listOfAmount]  # remove . or ,
    if not listOfAmount:
        return 0
    else:
        return sum(listOfAmount) / len(listOfAmount)


def matchCompanyName(companyName):
    connectionString = "mongodb://admin:ABcd1234@ds237989.mlab.com:37989/job-trending-db"
    client = pymongo.MongoClient(connectionString)
    db = client.get_database()
    companies_db = db['companies']
    
    slug = slugify(companyName)
    result = companies_db.find_one({"slug": slug},{"_id" : 1})
    if result is not None:
        #print ("COMPANY EXISTED")
        client.close()
        return str(result["_id"])
    else:
        newCompany = companies_db.insert_one({ "name": companyName, "location": "unknown", "link": "unknown"})
        #print ("NEW COMPANY FOUND: ", companyName)
        client.close()
        return newCompany.inserted_id
    
 
    
    


home_url = "https://itviec.com"
main_url = "https://itviec.com/it-jobs/"
base_url = "https://itviec.com/it-jobs?page="

session_requests = requests.session()

login_url = 'https://itviec.com/sign_in'
login_page_response = session_requests.get(login_url)
login_page_soup = BeautifulSoup(login_page_response.text, 'html.parser')
authenticity_token = login_page_soup.find(
    "input", {"name": "authenticity_token"}).get('value')
payload = {
    "utf8": "✓",
    "authenticity_token": authenticity_token,
    "user[email]": "friedfrog.frogsleap@gmail.com",
    "user[password]": "ABcd1234",
    "sign_in_then_review": "false",
    "commit": "Sign in",
}

result = session_requests.post(
    url=login_url,
    data=payload,
    headers={
        'X-Requested-With': 'XMLHttpRequest'
    }
)
result_json = json.loads(result.text)  # convert response to json

company_ids = []
jobs = []
language_tags = []
times = []
salaries = []
locations = []
top_3_reasons = []
jobs_description = []
experience = []
jobs_benefits = []
links = []
page = 1
keywords = set((pd.read_csv('jobs.txt', sep="\n", header=None))[0])
ENOUGH_FOR_TODAY = False

if result_json['success']:
    while True:
        if ENOUGH_FOR_TODAY:
            break
        response = session_requests.get(base_url + str(page))
        soup = BeautifulSoup(response.text, 'html.parser')
        checkNotFoundInTitle = soup.find("title")
        if checkNotFoundInTitle.text.find(
                "not found") >= 0:  # it returns -1 if the string not found, otherwise returns the position (
            # positive number)
            break

        jobs_containers = soup.find_all("div", attrs={'class': 'first-group'})
        for jobs_container in jobs_containers: 
            if ENOUGH_FOR_TODAY:
                break
            divJobContainers = jobs_container.find_all(
                "div", attrs={'class': 'job'})
            for job in divJobContainers:
                 # Find distance time
                distance_time = job.select_one(
                    '.distance-time').text.split(' ', 2)
                current_time = datetime.datetime.now()
                if distance_time[1].find("hour") >= 0:
                    distance_time = int(distance_time[0])
                    deviation_time = datetime.timedelta(days=0)
                    time = (current_time - deviation_time).strftime('%d-%m-%Y')
                    times.append(time)
                else:
                    ENOUGH_FOR_TODAY = True
                    break

                    # UNCOMMENT THIS LINE OF CODE IN CASE OF CRAWLING ALL DATA FROM THE FIRST TIME
                    # =============================================================================
                    #distance_time = int(distance_time[0])
                    #deviation_time = datetime.timedelta(days=distance_time)
                    #time = (current_time - deviation_time).strftime('%d-%m-%Y')
                    #times.append(time)
                    # =============================================================================
                

                # Find company name from alt of logo img
                #img = job.find("img", alt=True)
                #name = img['alt'][:-11]        

                
                # Find salary
                salary = job.find(
                    "span", attrs={'class': 'salary-text'}).getText()
                salary = handleSalary(salary)

                salaries.append(salary)

                # =============================================================================
                # soup.select('div')
                # All elements named <div>
                #
                # soup.select('#author')
                # The element with an id attribute of author
                #
                # soup.select('.notice')
                # All elements that use a CSS class attribute named notice
                #
                # soup.select('div span')
                # All elements named <span> that are within an element named <div>
                #
                # soup.select('div > span')
                # All elements named <span> that are directly within an element named <div>, with no other element in between
                #
                # soup.select('input[name]')
                # All elements named <input> that have a name attribute with any value
                #
                # soup.select('input[type="button"]')
                # All elements named <input> that have an attribute named type with value button
                # =============================================================================

                # Find jobs
                test = job.select_one('h2 a').getText()
                jobName = job.select_one('h2 a').getText(
                ).lower().replace("-", "").replace("/", "")
                jobName = re.sub(r'\([^()]*\)', '', jobName)
                isChanged = False
                for keyword in keywords:
                    if keyword.lower() in jobName:
                        #print(jobName, "to", keyword)
                        jobName = keyword
                        isChanged = True
                        break
                if isChanged == False:
                    jobName = "other"
                #print(test, "to", jobName)
                jobs.append(jobName)

                # Find related languages
                jobtags = job.select('a span')
                languages = [tag.text.rstrip('\n').lstrip('\n')
                             for tag in jobtags]
                language_tags.append(languages)

                # Go to detail page to get the description
                link_container = job.find("h2", class_="title")
                link = link_container.a.get("href")
                job_url = home_url + link
                links.append(job_url)
                job_detail_response = session_requests.get(job_url)
                job_detail_soup = BeautifulSoup(
                    job_detail_response.text, 'html.parser')

                # Get more info about companies
                locations_container = job_detail_soup.find_all(
                    "div", class_="address__full-address")
                addresses = []
                for location in locations_container:
                    address = location.find("span")
                    if address is not None:
                        address = address.getText()
                    else:
                        address = location.getText().rstrip('\n').lstrip('\n')
                    addresses.append(address)
                locations.append(addresses)
                
                #Company's name
                company_name = job_detail_soup.select_one("div.employer-info a").text
                company_id = matchCompanyName(company_name)
                company_ids.append(company_id)

                

                # Get top 3 reasons
                top_3_reasons_container = job_detail_soup.select(
                    "div.top-3-reasons li")
                reasons = [reason.text.replace("-", " ")
                           for reason in top_3_reasons_container]
                reasons = " ".join(reasons)
                top_3_reasons.append(reasons)

                # Get job description
                job_description_container = job_detail_soup.select(
                    "div.description li")
                job_description = [criteria.text.replace(
                    "-", " ") for criteria in job_description_container]
                if not job_description:
                    job_description_container = job_detail_soup.select(
                        "div.description p")
                    job_description = [criteria.text.replace(
                        "-", " ") for criteria in job_description_container]
                job_description = " ".join(job_description)
                jobs_description.append(job_description)

                # Get experience
                job_exp_container = job_detail_soup.select("div.experience li")
                job_exp = [criteria.text.replace(
                    "-", " ") for criteria in job_exp_container]
                if not job_exp:
                    job_exp_container = job_detail_soup.select(
                        "div.description p")
                    job_exp = [criteria.text.replace(
                        "-", " ") for criteria in job_exp_container]
                job_exp = " ".join(job_exp)
                experience.append(job_exp)

                # Get benefits
                job_benefits_container = job_detail_soup.select(
                    "div.culture_description li")
                job_benefits = [criteria.text.replace(
                    "-", " ") for criteria in job_benefits_container]
                if not job_benefits:
                    job_benefits_container = job_detail_soup.select(
                        "div.description p")
                    job_benefits = [criteria.text.replace(
                        "-", " ") for criteria in job_benefits_container]
                job_benefits = " ".join(job_benefits)
                jobs_benefits.append(job_benefits)

        page = page + 1

else:
    print("Can not get data")
    
# =============================================================================
# topitworks' website
# =============================================================================
rows = []

#url and response
for i in range(30):
    url = 'https://jf8q26wwud-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.30.0%3BJS%20Helper%202.26.1&x-algolia-application-id=JF8Q26WWUD&x-algolia-api-key=2bc790c0d4f44db9ab6267a597d17f1a'
    params ={"requests":[{"indexName":"vnw_job_v2_topitworks","params":"query=&hitsPerPage=1&maxValuesPerFacet=1&page=" + str(i) + "&facets=%5B%22type%22%2C%22locations%22%2C%22jobLevel%22%2C%22skills%22%2C%22company%22%2C%22salaryMax%22%2C%22salaryMin%22%2C%22publishedDate%22%2C%22categoryIds%22%2C%22jobSalary%22%2C%22isSalaryVisible%22%5D&numericFilters=%5B%5B%22categoryIds%3D35%22%2C%22categoryIds%3D55%22%5D%5D"}]}
    data = json.dumps(params)
    response = requests.post(url, headers = {"Content-type": "application/json"}, data = data)
    dm = response.json()
    results = json.loads(json.dumps(dm["results"]))
    
    #hits
    hits_json = json.loads(json.dumps(results[0]["hits"]))
    #online date
    onlineDate = hits_json[0]["onlineDate"]
    onlineDate = ti.strftime('%Y-%m-%d', ti.localtime(onlineDate))
    
    #get time
    now = datetime.datetime.now()
    now = now.strftime("%Y-%m-%d")
    
    
# =============================================================================
#     Uncomment when crawling new ones 
# =============================================================================
    if onlineDate == now:
        benefits = hits_json[0]["benefits"]
        listBenefits = []
        for benefit in benefits:
            benefitName = benefit["benefitName"]
            benefitValue =  benefit["benefitValue"]
            listBenefits.append(benefitName + " : " + benefitValue)
            
        #Job title
        test_2 = hits_json[0]["jobTitle"]
        jobTitle = (hits_json[0]["jobTitle"]).lower().replace("-", "").replace("/", "")
        jobTitle =  re.sub(r'\([^()]*\)', '', jobTitle)
        isChanged = False
        other = 0
        for keyword in keywords:
            if keyword.lower() in jobTitle:
                #print(jobName, "to", keyword)
                jobTitle = keyword
                isChanged = True
                break
        if isChanged == False:
            jobTitle = "other"
        #print(test_2, "to", jobTitle)
        #Expired time
        expiredTime = hits_json[0]["expiredDate"]
        expiredTime = ti.strftime('%Y-%m-%d', ti.localtime(expiredTime))
        
        
        #categoryVIs
        categoryVIs = hits_json[0]["categoryVIs"]
        for categoryVI in categoryVIs:
            categories = categoryVI
            
        #skills
        skills = hits_json[0]["skills"]
        for skill in skills:
            skillRequired = skill
            
        #check if salary visible
        isSalaryVisible = hits_json[0]["isSalaryVisible"]
        if isSalaryVisible == False:
            salary = 0
        else:
            salaryMin = hits_json[0]["salaryMin"]
            salaryMax = hits_json[0]["salaryMax"]
            salary = str((salaryMin+salaryMax)/2)
        
        #position
        position = hits_json[0]["jobLevelVI"]
        
        #company
        company = hits_json[0]["company"]
        company_id = matchCompanyName(company)
        
        #location
        location = hits_json[0]["locations"]
        
        #jobDescription
        jobDescription = hits_json[0]["jobDescription"]
        
        #jobRequirement
        jobRequirement = hits_json[0]["jobRequirement"]
        
        rows.append({
        'company_id': company_id,
        'job': jobTitle,
        'salary': float(salary),
        'location': location,
        'link': "https://www.topitworks.com/vi/",
        'time': onlineDate})
        
#====================================================================
    # Company df
df = pd.DataFrame({
    'company_id': company_ids,
    'job': jobs,
    'salary': salaries,
    'location': locations,
    'link': links,
    'time': times
}).append(rows, ignore_index = True)
# companies.to_excel('data.xlsx', sheet_name='data', index=False)
# df.to_csv("C:/Users/nguyendhn/OneDrive/Desktop Synchronization/out.csv", encoding="utf-8")

if not df.empty:
# Handle data missing (salary)
    for (i, row) in df.iterrows():
        if row['salary'] == 0:
            job = row['job']
            mean_salary = df.loc[(df['job'] == job) & (
                df['salary'] != 0), 'salary'].mean()
            if math.isnan(mean_salary):
                mean_salary = df['salary'].mean()
            df.loc[i, 'salary'] = mean_salary
    
    
    # =============================================================================
    # Import to Mongodb
    connectionString = "mongodb://admin:ABcd1234@ds237989.mlab.com:37989/job-trending-db"
    client = pymongo.MongoClient(connectionString)
    db = client.get_database()
    data_db = db['jobs']
    data_db.insert_many(df.to_dict('records'))
    print("Done")
    client.close()
    
    # =============================================================================
    
