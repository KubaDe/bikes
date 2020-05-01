import * as yup from 'yup';

export const jsonSchema = yup.object().shape({
  markers: yup.object().shape({
    country: yup.object().shape({
      city: yup.object().shape({
        _attributes: yup.object().shape({
          uid: yup.string().required(),
          lat: yup.string().required(),
          lng: yup.string().required(),
          zoom: yup.string().required(),
          maps_icon: yup.string().required(),
          alias: yup.string().required(),
          break: yup.string().required(),
          name: yup.string().required(),
          num_places: yup.string().required(),
          refresh_rate: yup.string().required(),
          bounds: yup.string().required(),
          booked_bikes: yup.string().required(),
          set_point_bikes: yup.string().required(),
          available_bikes: yup.string().required(),
          return_to_official_only: yup.string().required(),
          bike_types: yup.string(),
          website: yup.string().required(),
        }).required(),
        place: yup.array().of(yup.object().shape({
          _attributes: yup.object().shape({
            uid: yup.string(),
            lat: yup.string(),
            lng: yup.string(),
            name: yup.string(),
            spot: yup.string(),
            number: yup.string(),
            bikes: yup.string(),
            booked_bikes: yup.string(),
            bike_racks: yup.string(),
            free_racks: yup.string(),
            free_special_racks: yup.string(),
            terminal_type: yup.string(),
            bike_numbers: yup.string(),
            bike_types: yup.string(),
            place_type: yup.string(),
            rack_locks: yup.string(),
          }).required(),
          bike: yup.array().of(yup.object().shape({
            _attributes: yup.object().shape({
              number: yup.string(),
              bike_type: yup.string(),
              lock_types: yup.string(),
              active: yup.string(),
              state: yup.string(),
              pedelec_battery: yup.string(),
            })
          })).nullable(true)
        })).required()
      }).required()
    }).required()
  }).required()
})

export type JsonData = yup.InferType<typeof jsonSchema>;

export const isJsonData = (jsonData: JsonData | unknown): jsonData is JsonData => {
  jsonSchema.validate(jsonData).catch(function(err) {
    console.error(err)
  });
    return jsonSchema.isValidSync(jsonData)
}
