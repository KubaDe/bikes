import * as yup from 'yup';

export const responseSchema = yup.object().shape({
  markers: yup.object().shape({

  }).required()
})

type Response = yup.InferType<typeof responseSchema>;

export const isResponseData = (responseData: Response | unknown): responseData is Response => {
    return responseSchema.isValidSync(responseData)
}
