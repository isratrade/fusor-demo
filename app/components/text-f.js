import Ember from 'ember';

export default Ember.Component.extend({

  typeInput: Ember.computed('type', function() {
    return (this.get('type') ? this.get('type') : 'text');
  }),

  validIsRequiredAndBlank: Ember.computed('value', 'isRequired', function() {
    return (this.get('isRequired') && Ember.isBlank(this.get('value')));
  }),

  isPassword: Ember.computed('type', function() {
    return (this.get('type') === 'password');
  }),

  doesntMatchPassword: Ember.computed('value', 'mustMatch', function() {
    return this.get('mustMatch') && this.get('mustMatch') !== this.get('value');
  }),

  passwordTooShort: Ember.computed('value', 'isPassword', 'minChars', function () {
    return this.get('isPassword') && this.get('minChars') && this.get('value.length') < this.get('minChars');
  }),

  invalidIsAlphaNumeric: Ember.computed('value', 'isAlphaNumeric', function() {
    if (this.get('isAlphaNumeric')) {
        var validAlphaNumbericRegex = new RegExp(/^[A-Za-z0-9_-]+$/);
        if (Ember.isPresent(this.get('value'))) {
            return !(this.get('value').match(validAlphaNumbericRegex));
        }
    }
  }),

  invalidIsHostname: Ember.computed('value', 'isHostname', function() {
    if (this.get('isHostname')) {
       var validHostnameRegex = "^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$";
       if (Ember.isPresent(this.get('value'))) {
            return !(this.get('value').match(validHostnameRegex));
        }
    }
  }),

  invalidNetworkRange: Ember.computed('value', 'isNetworkRange', function() {
      // TODO
      return false;
  }),


  hasError: Ember.computed(
    'showValidationError',
    'errors.name',
    'doesntMatchPassword',
    'passwordTooShort',
    'validIsRequiredAndBlank',
    'validIsUnique',
    'invalidIsAlphaNumeric',
    'invalidIsHostname',
    'invalidNetworkRange',
    function() {
      return (this.get('showValidationError') &&
              (Ember.isPresent(this.get('errors.name')) ||
               this.get('doesntMatchPassword') ||
               this.get('passwordTooShort') ||
               this.get('validIsRequiredAndBlank') ||
               this.get('validIsUnique') ||
               this.get('invalidIsAlphaNumeric') ||
               this.get('invalidIsHostname') ||
               this.get('invalidNetworkRange')
              )
             );
    }
  ),

  setOrigValue: Ember.on('didInsertElement', function() {
    console.log('didInsertElement');
    this.set('origValue', this.get('value'));
    console.log(this.get('origValue'));
  }),

  validIsUnique: Ember.computed('uniqueValues', 'value', 'isUnique', function() {
    if (this.get('isUnique')) {
        var uniqueNames = this.get('uniqueValues').removeObject(this.get('origValue'));
        return uniqueNames.contains(this.get('value'));
    }
  }),

  eyeIcon: 'fa-eye',
  isEyeOpen: true,

  actions: {
    showValidationErrors() {
      this.set("showValidationError", true);
    },

    showPassword() {
      this.set('isEyeOpen', this.toggleProperty('isEyeOpen'));
      if (this.get('isEyeOpen')) {
          this.set('typeInput', 'password');
          return this.set('eyeIcon', "fa-eye");
      } else {
          this.set('typeInput', 'text');
          return this.set('eyeIcon', "fa-eye-slash");
      }
    }
  }
});
