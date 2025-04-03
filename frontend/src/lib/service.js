import axios from "axios";

export function isEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
  return usernameRegex.test(username);
}

export async function clientGet(link = null, params = null) {
  if (!link) {
    return { success: false, msg: "Link is required to make a request." };
  }
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${link}`, {
      withCredentials: true,
      params: params,
    });
    return res.data;
  } catch (error) {
    const err = { success: false, msg: "Something went wrong" };
    if (axios.isAxiosError(error)) {
      if (error.response) {
        err.msg = error.response.data.message;
      } else {
        err.msg = "An Axios error occurred";
      }
    } else if (error instanceof Error) {
      err.msg = error.message;
    }
    return err;
  }
}
export async function clientPost(link = null, params = null, data = null) {
  if (!link) {
    return { success: false, msg: "Link is required to make a request." };
  }
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}${link}`,
      data,
      {
        withCredentials: true,
        params: params,
      }
    );
    console.log(res.data)
    return res.data;
  } catch (error) {
    const err = { success: false, msg: "Something went wrong" };
    // console.log(error)
    if (axios.isAxiosError(error)) {
      if (error.response) {
        err.msg = error.response.data.message;
      } else {
        err.msg = "An Axios error occurred";
      }
    } else if (error instanceof Error) {
      err.msg = error.message;
    }
    return err;
  }
}
export async function clientPatch(link = null, params = null, data = null) {
  if (!link) {
    return { success: false, msg: "Link is required to make a request." };
  }
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}${link}`,
      data,
      {
        withCredentials: true,
        params: params,
      }
    );
    return res.data;
  } catch (error) {
    const err = { success: false, msg: "Something went wrong" };
    if (axios.isAxiosError(error)) {
      if (error.response) {
        err.msg = error.response.data.message;
      } else {
        err.msg = "An Axios error occurred";
      }
    } else if (error instanceof Error) {
      err.msg = error.message;
    }
    return err;
  }
}
export async function clientDelete(link = null, params = null) {
  if (!link) {
    return { success: false, msg: "Link is required to make a request." };
  }
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}${link}`,
      {
        withCredentials: true,
        params: params,
      }
    );
    return res.data;
  } catch (error) {
    const err = { success: false, msg: "Something went wrong" };
    if (axios.isAxiosError(error)) {
      if (error.response) {
        err.msg = error.response.data.message;
      } else {
        err.msg = "An Axios error occurred";
      }
    } else if (error instanceof Error) {
      err.msg = error.message;
    }
    return err;
  }
}
