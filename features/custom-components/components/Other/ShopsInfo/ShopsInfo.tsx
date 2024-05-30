import { PropsNameEnum } from '@/features/page-editor';
import { shops } from '@/app/(marketing)/mocks';

export type ShopsInfoProps = {
  [PropsNameEnum.SHOPS]: typeof shops
  isPreview?: boolean
}

export const ShopsInfo = ({ shops }: ShopsInfoProps) => {
  if (!shops) {
    return null
  }

  return <div className="grid grid-cols-1 lg:grid-cols-2 p-4 lg:p-8">
    {shops.map(
      ({
         id,
         city,
         address,
         postalCode,
         email,
         phoneNumber,
         googleMapsUrl,
       }) => (
        <div key={id} className="flex flex-col gap-4 p-4">
          <p className="text-2xl font-medium">{city}</p>
          <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
            <div className="flex flex-col">
              <p className="text-base font-medium">Téléphone</p>
              <a
                href={`tel:${phoneNumber.replaceAll(' ', '')}`}
                className="text-base"
              >
                {phoneNumber}
              </a>
            </div>
            <div className="flex flex-col">
              <p className="text-base font-medium">E-mail</p>
              <a href={`mailto:${email}`} className="text-base">
                {email}
              </a>
            </div>
            <div className="flex flex-col">
              <p className="text-base font-medium">Adresse</p>
              <p className="text-base">{`${address}, ${postalCode} ${city}`}</p>
            </div>
          </div>
          <iframe
            style={{
              minHeight: '25rem',
            }}
            src={googleMapsUrl}
            loading={'lazy'}
          />
        </div>
      ),
    )}
  </div>
}