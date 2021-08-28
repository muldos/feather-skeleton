/* eslint-disable no-unused-vars */
exports.SubmitInfo = class SubmitInfo {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    return {
      bucket: "my-bucket",
      variantPath: "/toto",
    };
  }

  async get(id, params) {
    return {
      id,
      text: `A new message with ID: ${id}!`,
    };
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)));
    }

    return data;
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return { id };
  }
};
