interface RepositoryInterface<Model, CreateAttributes, IdT> {
	save(model: Model): Promise<Model>;
	create(attributes: CreateAttributes): Promise<Model>;
	all(): Promise<Model[]>;
	findById(id: IdT): Promise<Model>;
};

export default RepositoryInterface;
