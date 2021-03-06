from django.conf.urls.defaults import *
from django.conf import settings
from contact.forms import ContactForm
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

if settings.DEBUG:
    urlpatterns = patterns('',
                           (r'^media/(?P<path>.*)$',
                            'django.views.static.serve',
                            {'document_root': settings.MEDIA_ROOT}))
else:
    urlpatterns = patterns("")


urlpatterns += patterns(
    '',
    url(r'^$', 'django.views.generic.simple.direct_to_template',
        {'template': 'base.html', 'extra_context': {'form': ContactForm()}},
        name='index'),
    url(r'^contact/', include('contact.urls')),

    # Example:
    # (r'^anue/', include('anue.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # (r'^admin/', include(admin.site.urls)),
)
