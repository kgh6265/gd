'use strict';

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;
    if (!data.credential_id) {
      const yearStr = new Date().getFullYear().toString().slice(-2);
      const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
      data.credential_id = `DA${yearStr}-${randomStr}`;
    }
    data.verification_url = `https://gdclub.ritdubai.ae/verify/${data.credential_id}`;
  },
  async beforeUpdate(event) {
    const { data } = event.params;
    if (data.credential_id && !data.verification_url) {
      data.verification_url = `https://gdclub.ritdubai.ae/verify/${data.credential_id}`;
    }
  }
};
