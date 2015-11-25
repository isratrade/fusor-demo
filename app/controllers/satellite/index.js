import Ember from 'ember';
import NeedsDeploymentMixin from "../../mixins/needs-deployment-mixin";

export default Ember.Controller.extend(NeedsDeploymentMixin, {

  name: Ember.computed.alias("deploymentController.name"),
  description: Ember.computed.alias("deploymentController.description"),

  organizationTabRouteName: Ember.computed.alias("deploymentController.organizationTabRouteName"),

  disableNextOnDeploymentName: Ember.computed.alias("deploymentController.disableNextOnDeploymentName"),

  idSatName: 'deployment_sat_name',
  idSatDesc: 'deployment_sat_desc',

  isBackToDeployments: Ember.computed.alias("deploymentController.isBackToDeployments"),

  backRouteNameOnSatIndex: Ember.computed('isBackToDeployments', function() {
    if (this.get('isBackToDeployments')) {
      return 'deployments';
    } else {
      return 'deployment.start';
    }
  }),

  deploymentNames: Ember.computed.alias("applicationController.deploymentNames")

});
