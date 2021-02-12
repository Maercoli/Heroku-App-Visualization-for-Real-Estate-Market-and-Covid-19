# import necessary libraries
import os
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import (create_engine, func)
from flask import (
    Flask,
    render_template,
    url_for,
    json,
    jsonify,
    request,
    redirect)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
#app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "postgres://xbrqktwe:E_nywn4IJhz89kqxwG3M498kv8qnq4Z6@rajje.db.elephantsql.com:5432/xbrqktwe"
# engine = create_engine('postgres://xbrqktwe:E_nywn4IJhz89kqxwG3M498kv8qnq4Z6@rajje.db.elephantsql.com:5432/xbrqktwe')
engine=create_engine('postgres://gvrdqgbticobzd:62de2f0015e8651bd5c46847dad2dde40c5d646fe973a52346228fb03564862d@ec2-100-24-139-146.compute-1.amazonaws.com:5432/d3j1lp4tuvm6l1')
# Remove tracking modifications
#app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

Base = automap_base()
Base.prepare(engine, reflect=True)

#set all tables to variables
CovidCases_On=Base.classes.CovidCases_On
covid_dataset=Base.classes.covid_dataset

session = Session(engine)

db = SQLAlchemy(app)

#Pet = create_classes(db)

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/map")
def start_map():
    return render_template("map.html")

# @app.route("/api/v1/data")
# def get_data():
#     result=pd.read_sql('select * from "CovidCases_On";', engine)
#     result_dict=result.to_dict(orient='list')
#     return jsonify(result_dict)

@app.route("/api/v1/dataX")
def get_dataX():
    result=session.query(CovidCases_On).all()
    result_dict=[]
    for i in result:
        single_dict={}
        single_dict[i.Date]=i.Number_of_Cases
        result_dict.append(single_dict)
    return jsonify(result_dict)

@app.route("/api/v2/covid")

def get_covid():
    
    covid_list = []

    with engine.connect() as con:
        query = """SELECT "Reporting_PHU_City","month"  FROM "covid_dataset" """
        result = con.execute(query)
        
        

        for row in result:
            Reporting_PHU_City = row[0]
            month = row[1]
            covid_list.append({"Reporting_PHU_City": Reporting_PHU_City, "month":month})

    return jsonify(covid_list)


@app.route("/api/v2/covidTmp")
# I will remove that one once it starts working (Emilia)

def get_covid_tmp():
    
    covid_list_tmp = []
#covid_dataset
#session.query(Table.column, func.count(Table.column)).group_by(Table.column).all()
##    //with engine.connect() as con:
##   //    query = """SELECT "Reporting_PHU_City","month", "Reporting_PHU_Latitude", "Reporting_PHU_Longitude" FROM "covid_dataset" """
##    //    result_tmp = con.execute(query)
    ###covid_list_tmp = session.query(covid_dataset.Reporting_PHU_City, covid_dataset.month,covid_dataset.Reporting_PHU_Latitude, covid_dataset.Reporting_PHU_Longitude, func.count(covid_dataset.Row_ID)).group_by(covid_dataset.Reporting_PHU_City,covid_dataset.month, covid_dataset.Reporting_PHU_Latitude,covid_dataset.Reporting_PHU_Longitude).order_by(covid_dataset.Reporting_PHU_City, covid_dataset.month).all()
    covid_list_tmp = session.query(covid_dataset.Reporting_PHU_City, covid_dataset.Reporting_PHU_Latitude, covid_dataset.Reporting_PHU_Longitude, func.count(covid_dataset.Row_ID)).group_by(covid_dataset.Reporting_PHU_City, covid_dataset.Reporting_PHU_Latitude,covid_dataset.Reporting_PHU_Longitude).order_by(covid_dataset.Reporting_PHU_City).all()

    
#    for row in result_tmp:
#        Reporting_PHU_City = row[0]
#        month = row[1]
#        Reporting_PHU_Latitude = row[2]
#        Reporting_PHU_Longitude = row[3]
#        #covid_cases_data = row[4]
#        covid_list_tmp.append({"Reporting_PHU_City": Reporting_PHU_City, "month":month ,"Reporting_PHU_Latitude":Reporting_PHU_Latitude, "Reporting_PHU_Longitude":Reporting_PHU_Longitude})

    return jsonify(covid_list_tmp)
    

@app.route("/api/v2/bar_line")

def get_bar_line_data():
    
    bar_list_2019 = []
    bar_list_2020 = []
    bc_list_2019 = []
    bc_list_2020 = []

    with engine.connect() as con:
        query1 = """SELECT "Date", "Units"  FROM "Price_Houses_sold_ON_2019" """
        query2 = """SELECT "Date", "Units"  FROM "Price_Houses_sold_ON_2020" """
        query3 = """SELECT "Date", "Units"  FROM "Units_sold_BC_transf_2019" """
        query4 = """SELECT "Date", "Units"  FROM "Units_sold_BC_transf_2020" """

        result1 = con.execute(query1)
        result2 = con.execute(query2)
        result3 = con.execute(query3)
        result4 = con.execute(query4)

        for row in result1:
            Date = row[0]
            Units = row[1]
            bar_list_2019.append({"Date": Date, "Units":Units})
        
        for row in result2:
            Date = row[0]
            Units = row[1]
            bar_list_2020.append({"Date": Date, "Units":Units})
        
        for row in result3:
            Date = row[0]
            Units = row[1]
            bc_list_2020.append({"Date": Date, "Units":Units})
        
        for row in result4:
            Date = row[0]
            Units = row[1]
            bc_list_2020.append({"Date": Date, "Units":Units})

    return jsonify(bar_list_2019, bar_list_2020, bc_list_2019, bc_list_2020)

@app.route("/api/v2/scatter")

def get_scatter():

    Scatter_list = []

    with engine.connect() as con:
        query = """SELECT "Date","Average", "Units"  FROM "Price_Houses_sold_ON_2020" """
        result = con.execute(query)
        for row in result:
                Date = row[0]
                Average = row[1]
                Units = row[2]
                Scatter_list.append({"Date": Date, "Average":Average, "Units":Units})
    return jsonify(Scatter_list)

session.close()
if __name__ == "__main__":
    app.run()
