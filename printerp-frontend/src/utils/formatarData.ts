import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function formatarData(data: Date | string | undefined) {
  if (data) {
    return format(
      parseISO(String(data)),
      "dd 'de' MMMM 'de' yyyy 'às' HH:mm:ss",
      {
        locale: ptBR,
      }
    );
  }
  return "";
}
