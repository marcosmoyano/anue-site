from django import forms
from django.conf import settings
from django.core.mail import send_mail
from django.forms.util import ErrorList
from django.utils.translation import ugettext as _


class ContactForm(forms.Form):

    name = forms.CharField(
        max_length=100, widget=forms.TextInput, label=_(u'Name'), required=True,
    )
    email = forms.EmailField(label=_(u'Email'), required=True)
    message = forms.CharField(
        widget=forms.Textarea, label=_(u'Message'), required=True
    )
    honeypot = forms.CharField(label=_(u'Honeypot (do not fill)'), required=False)

    def clean_honeypot(self):
        if self.cleaned_data.get('honeypot'):
            self._errors['honeypot'] = ErrorList([_(u"Don't fill this field!")])

    def save(self, fail_silently=False):
        """Build and send the email message."""
        message = """Name: %(name)s\n""" \
                  """Email: %(email)s\n""" \
                  """Message:\n    %(message)s""" % {
                      'name': self.cleaned_data['name'],
                      'email': self.cleaned_data['email'],
                      'message': self.cleaned_data['message']
                  }
        send_mail(fail_silently=False,
                  from_email=self.cleaned_data['email'],
                  message=message,
                  subject=_('Contact from site'),
                  recipient_list=[admin[1] for admin in settings.ADMINS])
