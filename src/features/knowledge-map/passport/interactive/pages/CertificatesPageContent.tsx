import type { CertificateRow } from '../passportPageData'

export default function CertificatesPageContent({ certificates }: { certificates: CertificateRow[] }) {
  return (
    <>
      <h2 className="passport-page-title">Certificates</h2>
      <p className="passport-page-subtitle">Regional mastery awards</p>
      <div className="grid grid-cols-2 gap-2 flex-1 content-start overflow-y-auto">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="rounded-md border p-2 text-center"
            style={{
              borderColor: 'rgba(201, 168, 76, 0.5)',
              backgroundColor: cert.unlocked ? 'rgba(253, 246, 227, 0.9)' : 'rgba(0, 0, 0, 0.03)',
              opacity: cert.unlocked ? 1 : 0.55,
            }}
          >
            <p className="passport-field-value text-[0.7rem] m-0">{cert.name}</p>
            <p className="passport-field-label text-[0.5rem] m-0 mt-1">
              {cert.unlocked ? 'Unlocked' : `🔒 ${cert.progress}%`}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}
