from django.conf.urls.defaults import *


urlpatterns = patterns('',
    url(r'^$', 'contact.views.contact', name='contact'),
    url(r'^ajax/$', 'contact.views.ajax', name='contact_ajax'),
    url(r'^success/$', 'django.views.generic.simple.direct_to_template',
        {'template': 'contact/success.html'}, name='contact_success')
)
