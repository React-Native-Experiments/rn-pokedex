class Http {
  async get<T = unknown>(url: string, params?: Record<string, string | number | boolean>) {
    const urlObj = new URL(url);

    if (params) {
      const paramsStr = Object.fromEntries(Object.entries(params).map(([k, v]) => [k, v.toString()]));

      urlObj.search = new URLSearchParams(paramsStr).toString();
    }

    const response = await fetch(urlObj);

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return {
      ...response,
      data: (await response.json()) as T,
    };
  }
}

export default new Http();
