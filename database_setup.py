#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from sqlalchemy import Column, ForeignKey, Integer, String, VARCHAR, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from sqlalchemy.sql.sqltypes import DateTime
from sqlalchemy.sql.type_api import INTEGERTYPE



Base = declarative_base()

class TODO(Base):
    __tablename__ = 'todo'

    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)
    content = Column(String(250), nullable=False)
    percentage_done = Column(INTEGERTYPE, default=0)
    # date_created = Column(datetime, default=dateTime.now())

engine = create_engine('sqlite:///test.db')
Base.metadata.create_all(engine)
