from django.core.urlresolvers import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.utils import simplejson

from forms import ContactForm


def ajax(request,):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponse(simplejson.dumps({
                "success": True,
            }), "application/json")
        else:
            return HttpResponse(simplejson.dumps({
                "success": False,
                "errors": form.errors
            }), "application/json")
    else:
        raise Http404

def contact(request):

    if not request.POST:
        form = ContactForm()
    else:
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('contact_success'))
    return render_to_response('contact/contact.html',
                              {'form': form},
                              context_instance=RequestContext(request))
