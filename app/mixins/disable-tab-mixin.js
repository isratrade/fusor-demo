import Ember from 'ember';

export default Ember.Mixin.create({

  deploymentController: Ember.inject.controller('deployment'),
  applicationController: Ember.inject.controller('application'),
  configureOrganizationController: Ember.inject.controller('configure-organization'),
  configureEnvironmentController: Ember.inject.controller('configure-environment'),

  hasName: Ember.computed('model.name', function() {
    return (this.get('model.name.length') > 0);
  }),
  hasNoName: Ember.computed.not('hasName'),

  hasOrganization: Ember.computed('model.organization.id', function() {
    return !!(this.get('model.organization.id'));
  }),
  hasNoOrganization: Ember.computed.not('hasOrganization'),

  deploymentNames: Ember.computed.alias("applicationController.deploymentNames"),

  isDuplicateName: Ember.computed('model.name', function() {
    if (this.get('model').get('isNew')) {
      return this.get('deploymentNames').contains(this.get('model.name'));
    } else {
      var attrs = this.get('model').changedAttributes();
      if (attrs.name) {
        var origValue = attrs.name[0];
        var dirtyValue = attrs.name[1];
        if (origValue !== dirtyValue) {
            return this.get('deploymentNames').contains(dirtyValue);
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }),

  // disable All if there is no deployment name
  disableAll: Ember.computed.alias("hasNoName"),

  // disable Next on Deployment Name if there is no deployment name
  disableNextOnDeploymentName: Ember.computed.or("hasNoName", 'isDuplicateName'),

  // disable Next on Configure Organization if no organization is selected
  disableNextOnConfigureOrganization: Ember.computed.or('hasNoOrganization', 'disableAll'),

  // disable Next on Lifecycle Environment if no lifecycle environment is selected
  // note: hasNoLifecycleEnvironment and hasNoLifecycleEnvironment is defined in /app/controllers/deployment.js
  //       and app/controllers/deployment-new.js rather than in this mixin
  disableNextOnLifecycleEnvironment: Ember.computed.or('hasNoLifecycleEnvironment', 'disableAll', 'model.isSaving'),

  // Satellite Tabs Only
  disableTabDeploymentName: false, // always enable tab for entering deployment name
  disableTabConfigureOrganization: Ember.computed.alias('disableNextOnDeploymentName'),
  disableTabLifecycleEnvironment: Ember.computed.alias("disableNextOnConfigureOrganization"),
  disableTabAccessInsights: Ember.computed.or("disableNextOnDeploymentName", 'hasNoOrganization', 'disableNextOnLifecycleEnvironment')

});
