# -*- coding: utf-8 -*-
{
    'name': "Phone Number Picker",

    'summary': """
        """,

    'description': """
        Module For easy phone number entering
    """,

    'author': "Walid Mashal",
    'website': "https://github.com/walid-netlinks",

    'category': 'Extra Tools',
    'version': '1.0',
    'application': True,

    'depends': ['base', 'web'],

    'data': [
        'views/templates.xml',
    ],
    
    'qweb': [
        'static/src/xml/*.xml',
    ],
}
