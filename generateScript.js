import { writeFileSync, mkdirSync } from "node:fs";

// Cole aqui todos os IDs das empresas BR
const id_empresas_br = [
  422, 423, 424, 425, 426, 457, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595, 596, 597, 598, 599, 600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617, 618, 619, 620, 621, 622, 623, 624, 625, 626, 627, 628, 629, 630, 631, 632, 633, 634, 635, 636, 641, 643, 644, 645, 646, 647, 648, 649, 650, 651, 652, 653, 654, 659, 660, 661, 662, 664, 674, 675, 676, 677, 678, 735, 776, 777, 778, 779, 780, 781, 782, 783, 784, 785, 786, 1004, 1006, 1007, 1008, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1021, 1022, 1023, 1024, 1025, 1026, 1028, 1029, 1030, 1031, 1034, 1035, 1036, 1037, 1038, 1039, 1040, 1041, 1043, 1044, 1045, 1046, 1047, 1050, 1051, 1052, 1054, 1055, 1056, 1057, 1058, 1059, 1063
];

// Cole aqui todos os IDs das empresas Espanholas
const id_empresas_es = [
  369, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 637, 638, 639, 640, 642, 663, 665, 666, 667, 668, 669, 670, 671, 672, 673, 679, 680, 681, 682, 683, 684, 685, 686, 687, 688, 689, 690, 691, 692, 693, 694, 695, 696, 697, 698, 699, 700, 701, 702, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721, 722, 723, 724, 725, 726, 727, 728, 729, 730, 731, 732, 733, 736, 737, 738, 739, 740, 741, 742, 743, 744, 745, 746, 747, 748, 749, 750, 751, 752, 753, 754, 755, 756, 757, 758, 759, 760, 761, 762, 763, 764, 765, 766, 767, 768, 769, 770, 771, 774, 775, 1009, 1010, 1011, 1012, 1020, 1027, 1033, 1042, 1048, 1049, 1061, 1062, 1064
];

// Coloque a prioridade desejada
const prioridade = 0;

// Cole aqui os IDs dos tipos de itens para qual deseja gerar os inserts
const id_tipo_items = [104, 108];

// Garante que a pasta 'temp' existe
mkdirSync("./temp", { recursive: true });

// Gera para empresas BR
let outputBR = "";
outputBR += "USE klassmatt_mercadolibre;\n\nBEGIN TRAN;\n\n"; // Informe o banco de dados
for (const id_empresa_expansao of id_empresas_br) {
  for (const id_empresa_origem of id_empresas_br) {
    if (id_empresa_expansao === id_empresa_origem) continue;
    for (const id_tipo_item of id_tipo_items) {
      outputBR += `    IF NOT EXISTS (
        SELECT 1 FROM empresas_expansao_automatica
        WHERE IdEmpresaExpansao = ${id_empresa_expansao}
          AND IdEmpresaOrigem = ${id_empresa_origem}
          AND IdTipoItem = ${id_tipo_item}
      )
      BEGIN
        INSERT INTO [empresas_expansao_automatica]
          (IdEmpresaExpansao, IdLocalExpansao, IdTipoItem, IdCampo, IdCategoria, IdEmpresaCategoria, IdLocalOrigem, IdEmpresaOrigem, IdWf, Prioridade)
        VALUES
          (${id_empresa_expansao}, NULL, ${id_tipo_item}, NULL, NULL, NULL, NULL, ${id_empresa_origem}, NULL, ${prioridade});
        PRINT 'Inserido: IdEmpresaExpansao=${id_empresa_expansao}, IdEmpresaOrigem=${id_empresa_origem}, IdTipoItem=${id_tipo_item}';
      END

`;
    }
  }
}
outputBR += "--COMMIT;\n";
writeFileSync("./temp/inserts_empresas_expansao_automatica_BR.sql", outputBR);

// Gera para empresas ES
let outputES = "";
outputES += "USE klassmatt_mercadolibre;\n\nBEGIN TRAN;\n\n"; // Informe o banco de dados
for (const id_empresa_expansao of id_empresas_es) {
  for (const id_empresa_origem of id_empresas_es) {
    if (id_empresa_expansao === id_empresa_origem) continue;
    for (const id_tipo_item of id_tipo_items) {
      outputES += `    IF NOT EXISTS (
        SELECT 1 FROM empresas_expansao_automatica
        WHERE IdEmpresaExpansao = ${id_empresa_expansao}
          AND IdEmpresaOrigem = ${id_empresa_origem}
          AND IdTipoItem = ${id_tipo_item}
      )
      BEGIN
        INSERT INTO [empresas_expansao_automatica]
          (IdEmpresaExpansao, IdLocalExpansao, IdTipoItem, IdCampo, IdCategoria, IdEmpresaCategoria, IdLocalOrigem, IdEmpresaOrigem, IdWf, Prioridade)
        VALUES
          (${id_empresa_expansao}, NULL, ${id_tipo_item}, NULL, NULL, NULL, NULL, ${id_empresa_origem}, NULL, ${prioridade});
        PRINT 'Inserido: IdEmpresaExpansao=${id_empresa_expansao}, IdEmpresaOrigem=${id_empresa_origem}, IdTipoItem=${id_tipo_item}';
      END

`;
    }
  }
}
outputES += "--COMMIT;\n";
writeFileSync("./temp/inserts_empresas_expansao_automatica_ES.sql", outputES);

console.log("Arquivos SQL gerados com sucesso!");

// Para o rodar o gerador de script, execute o seguinte comando: 'node generateScript.js'.
// O arquivo gerado estará na pasta 'temp' com o nome de 'inserts_empresas_expansao_automatica_BR.sql' e 'inserts_empresas_expansao_automatica_ES.sql'.
// O script irá inserir os dados na tabela 'empresas_expansao_automatica', caso não existam.