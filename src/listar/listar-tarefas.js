import React, { useEffect, useState } from 'react';
import { A } from 'hookrouter';
import { Table } from 'react-bootstrap';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons'; 
import ItensListaTarefas from './itens-lista-tarefas';
import Paginacao from './paginacao';


function ListarTarefas() {

    const ITENS_POR_PAG = 4;

    const [tarefas, setTarefas] = useState([]);
    const [carregarTarefas, setCarregarTarefas] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [paginaAtual, setPaginaAtual] = useState(1);

    useEffect(() =>{
        function obterTarefas(){
            const tarefasDb = localStorage['tarefas'];
            let listaTarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
            setTotalItems(listaTarefas.length);
            // divisao de cada tarefa por pagina
            setTarefas(listaTarefas.splice((paginaAtual - 1) * ITENS_POR_PAG, ITENS_POR_PAG ));
            
            
        }
        if(carregarTarefas) {
        obterTarefas();
        setCarregarTarefas(false);
    }
    }, [carregarTarefas, paginaAtual]);

    function handleMudarPagina(pagina){
        setPaginaAtual(pagina);
        setCarregarTarefas(true);
    }

    return (
       <div className="text-center">
        <h3>Tarefas a fazer</h3>
        <Table striped bordered hover responsive data-testid="tabela">
            <thead>
                <tr>
                    <th>Tarefa</th>
                    <th>
                        <A href="/cadastrar"
                        className=" btn btn-success btn-sm"
                        data-testid="btn-nova-tarefa">
                             <FontAwesomeIcon icon={faPlus} />
                             &nbsp;
                            Nova tarefa
                        </A>
                    </th>
                </tr>
            </thead>
            <tbody>
                <ItensListaTarefas
                 tarefas={tarefas}
                 recarregarTarefas={setCarregarTarefas} />
            </tbody>
        </Table>
        <Paginacao 
          totalItems={totalItems}
          itemsPorPagina={ITENS_POR_PAG}
          paginaAtual={paginaAtual}
          mudarPagina={handleMudarPagina}  />
       </div>
    );
}

export default ListarTarefas;