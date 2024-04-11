function DashParagraph({ icon, text }) {
  return (
    <p className="flex items-center gap-2">
      {icon}
      {text}
    </p>
  );
}

export default DashParagraph;
