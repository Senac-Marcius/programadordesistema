function listGames({
    games,
    funcExcluir,
    funcEdit,
    funcVer
}){
    return(
        <div className='row'>
        {games.map(
            g => (
            <div className='cardGame' key={g.id} >
                Nome: {g.name}<br/>
                <a url={g.url}></a>
                {/*<></>*/}
                <p>{g.description}</p>
                <Button variant="danger" onClick={funcExcluir}  >Excluir</Button>
                <Button variant="primary" onClick={funcVer}>Ver</Button>
                <Button variant="warning" onClick={funcEdit}>Editar</Button>
            </div>
            )
        )}
        </div>
    );
}

export {listGames}